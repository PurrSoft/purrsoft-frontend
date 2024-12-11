import { 
    BaseQueryFn,
    EndpointBuilder, 
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";

const animalProfileTag = 'AnimalProfile';
type TagTypes = typeof animalProfileTag;

export type AnimalProfile = {
    id: string;
    currentDisease?: string;
    currentMedication?: string;
    pastDisease?: string;
    animalId: string;
    passport?: string;
    microchip?: string;
    externalDeworming?: string;
    internalDeworming?: string;
    currentTreatment?: string;
    multivalentVaccine?: string;
    rabiesVaccine?: string;
    fivFeLVTest?: string;
    coronavirusVaccine?: string;
    giardiaTest?: string;
    earMiteTreatment?: string;
    intakeNotes?: string;
    additionalMedicalInfo?: string;
    additionalInfo?: string;
    medicalAppointments?: string;
    refillReminders?: string;
    usefulLinks?: string[];
}

export type AnimalProfilesPaginatedResponse = {
  records: Array<AnimalProfile>;
  totalNumbersOfRecords: number;
}

export const endpoints = <Tags extends string> (
    builder: EndpointBuilder<
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      Tags | TagTypes,
      'api'
    >,
  ) => ({
    getAnimalProfile: builder.query<AnimalProfile, string>({
      providesTags: [animalProfileTag],  
      query: (id) => ({
            url: `/AnimalProfile/${id}`,
            method: 'GET'
        }),
    }),
    updateAnimalProfile: builder.mutation<void, AnimalProfile>({
      invalidatesTags: [animalProfileTag],
      query: (profile) => ({
        url: `/AnimalProfile`,
        method: 'PUT',
        body: profile
      }),
    }),
  });