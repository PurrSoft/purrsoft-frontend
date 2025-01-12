import { Middleware } from "@reduxjs/toolkit";
import * as signalR from "@microsoft/signalr";
import { api } from "../store";

const apiPath = import.meta.env.VITE_SERVER_PATH as string;

const hubUrl = apiPath + '/hubs/general';

export const signalRMiddleware: Middleware = (store) => {
    let connection: signalR.HubConnection | null = null;

    const startConnection = async () => {
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect()
            .build();

        connection.on('ReceiveMessage', (message) => {
            console.log('Received message:', message);
            const { entityType, operationType, payload } = message;
            switch (entityType) {
                case 'AnimalDto':
                    store.dispatch(
                        api.util.updateQueryData('getAnimals', undefined, (draft) => {
                            if (operationType === 'Add') {
                                draft.records.push(payload);
                            } else if (operationType === 'Update') {
                                console.log('Updating animal:', payload);
                                const index = draft.records.findIndex((animal) => animal.id === payload.id);
                                if (index >= 0) {
                                    console.log('Found animal:', draft.records[index]);
                                    console.log('Draft before update:', JSON.parse(JSON.stringify(draft)));
                                    Object.assign(draft.records[index], payload);
                                    console.log('Draft after update:', JSON.parse(JSON.stringify(draft)));
                                }
                            } else if (operationType === 'Delete') {
                                draft.records = draft.records.filter((animal) => animal.id !== payload.id);
                            }
                        }) as any
                    );
                    break;

                case 'Notifications':
                    store.dispatch(
                        api.util.updateQueryData('getNotifications', undefined, (draft) => {
                            if (operationType === 'Add') {
                                draft.records.push(payload);
                            } else if (operationType === 'Update') {
                                const index = draft.records.findIndex((notification) => notification.id === payload.id);
                                if (index >= 0) {
                                    draft.records[index] = payload;
                                }
                            } else if (operationType === 'Delete') {
                                draft.records = draft.records.filter((notification) => notification.id !== payload.id);
                            }
                        }) as any
                    );
                    break;
                
                default:
                    console.warn('Unknown entity type:', entityType);
            }
        });

        connection.onclose(() => {
            console.error('SignalR connection closed. Attempting to restart...');
            startConnection();
        });

        await connection.start();
    };

    startConnection();

    return (next) => (action) => next(action);
};