import { Middleware } from '@reduxjs/toolkit';
import * as signalR from '@microsoft/signalr';
import { api } from '../store';

const hubUrl = import.meta.env.VITE_HUB_PATH as string;

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
        case 'Animal':
          store.dispatch(
            api.util.updateQueryData('getAnimals', undefined, (draft) => {
              if (operationType === 'Add') {
                draft.records.push(payload);
              } else if (operationType === 'Update') {
                const index = draft.records.findIndex(
                  (animal) => animal.id === payload.id,
                );
                if (index >= 0) {
                  Object.assign(draft.records[index], payload);
                }
              } else if (operationType === 'Delete') {
                draft.records = draft.records.filter(
                  (animal) => animal.id !== payload,
                );
              }
            }) as any,
          );
          break;

        case 'AnimalProfile':
          if (operationType === 'Update' || operationType === 'Add') {
            store.dispatch(
              api.util.updateQueryData(
                'getAnimalProfile',
                payload.animalId,
                (draft) => {
                  Object.assign(draft, payload);
                },
              ) as any,
            );
          } else if (operationType === 'Delete') {
            store.dispatch(
              api.util.updateQueryData('getAnimalProfile', payload, () => {
                return undefined;
              }) as any,
            );
          }
          break;

        case 'Event':
          store.dispatch(
            api.util.updateQueryData(
              'getEvents',
              { Skip: 0, Take: 1000 },
              (draft) => {
                if (operationType === 'Add') {
                  console.log('Adding event:', payload);
                  draft.records.push(payload);
                } else if (operationType === 'Update') {
                  const index = draft.records.findIndex(
                    (event) => event.id === payload.id,
                  );
                  if (index >= 0) {
                    Object.assign(draft.records[index], payload);
                  }
                } else if (operationType === 'Delete') {
                  draft.records = draft.records.filter(
                    (event) => event.id !== payload,
                  );
                }
              },
            ) as any,
          );
          break;

        case 'Foster':
          store.dispatch(
            api.util.updateQueryData('getFosters', undefined, (draft) => {
              if (operationType === 'Add') {
                draft.records.push(payload);
              } else if (operationType === 'Update') {
                const index = draft.records.findIndex(
                  (foster) => foster.userId === payload.userId,
                );
                if (index >= 0) {
                  Object.assign(draft.records[index], payload);
                }
              } else if (operationType === 'Delete') {
                draft.records = draft.records.filter(
                  (foster) => foster.userId !== payload,
                );
              }
            }) as any,
          );
          break;

        case 'Notifications':
          console.log('Received notification:', payload);
          store.dispatch(
            api.util.updateQueryData(
              'getNotifications',
              {
                userId: payload.userId,
              },
              (draft) => {
                if (operationType === 'Add') {
                  draft.records.push(payload);
                } else if (operationType === 'Update') {
                  const index = draft.records.findIndex(
                    (notification) => notification.id === payload.id,
                  );
                  if (index >= 0) {
                    draft.records[index] = payload;
                  }
                } else if (operationType === 'Delete') {
                  draft.records = draft.records.filter(
                    (notification) => notification.id !== payload,
                  );
                }
              },
            ) as any,
          );
          break;

        case 'Shift':
          store.dispatch(
            api.util.updateQueryData('getShifts', {}, (draft) => {
              if (operationType === 'Add') {
                draft.records.push(payload);
              } else if (operationType === 'Update') {
                const index = draft.records.findIndex(
                  (shift) => shift.id === payload.id,
                );
                if (index >= 0) {
                  draft.records[index] = payload;
                }
              } else if (operationType === 'Delete') {
                draft.records = draft.records.filter(
                  (shift) => shift.id !== payload,
                );
              }
            }) as any,
          );
          break;

        case 'Volunteer':
          store.dispatch(
            api.util.updateQueryData('getVolunteers', undefined, (draft) => {
              if (operationType === 'Add') {
                draft.records.push(payload);
              } else if (operationType === 'Update') {
                const index = draft.records.findIndex(
                  (volunteer) => volunteer.userId === payload.userId,
                );
                if (index >= 0) {
                  draft.records[index] = payload;
                }
              } else if (operationType === 'Delete') {
                draft.records = draft.records.filter(
                  (volunteer) => volunteer.userId !== payload,
                );
              }
            }) as any,
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
