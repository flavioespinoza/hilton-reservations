import { Int, _roundToInt, _toInt, _checkIsInt, _assertAsInt } from '../utils/IntegerType'

type AggregateReservation = {
    count: Int
}

type BatchPayload = {
    count: Long
}

enum Mutationinterface {
    CREATED,
    UPDATED,
    DELETED
}

type ID = String

type ReservationInput = {
    $name: String
    $hotelName: String
    $arrivalDate: String
    $departureDate: String
}

type ReservationCreateInput = ($input: ReservationInput) => {
    name: String
    hotelName: String
    arrivalDate: String
    departureDate: String
  
}

type Mutation = {
    createReservation(data: ReservationCreateInput): Reservation,
    updateReservation(data: ReservationUpdateInput, where: ReservationWhereUniqueInput): Reservation,
    deleteReservation(where: ReservationWhereUniqueInput): Reservation,
    upsertReservation(
        where: ReservationWhereUniqueInput,
        create: ReservationCreateInput,
        update: ReservationUpdateInput
    ): Reservation
    updateManyReservations(data: ReservationUpdateManyMutationInput, where: ReservationWhereInput): BatchPayload
    deleteManyReservations(where: ReservationWhereInput): BatchPayload
}

interface Node {
    id: ID
}

interface PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
}

interface Query {
    reservations(
        where: ReservationWhereInput,
        orderBy: ReservationOrderByInput,
        skip: Int,
        after: String,
        before: String,
        first: Int,
        last: Int
    ): [Reservation]
    reservation(where: ReservationWhereUniqueInput): Reservation
    reservationsConnection(
        where: ReservationWhereInput,
        orderBy: ReservationOrderByInput,
        skip: Int,
        after: String,
        before: String,
        first: Int,
        last: Int
    ): ReservationConnection
    node(id: ID): Node
}

interface Reservation extends Node {
    id: ID
    name: String
    hotelName: String
    arrivalDate: String
    departureDate: String
}

interface ReservationConnection {
    pageInfo: PageInfo
    edges: [ReservationEdge]
    aggregate: AggregateReservation
}

interface ReservationEdge {
    node: Reservation
    cursor: String
}

enum ReservationOrderByInput {
    id_ASC,
    id_DESC,
    name_ASC,
    name_DESC,
    hotelName_ASC,
    hotelName_DESC,
    arrivalDate_ASC,
    arrivalDate_DESC,
    departureDate_ASC,
    departureDate_DESC,
    updatedAt_ASC,
    updatedAt_DESC,
    createdAt_ASC,
    createdAt_DESC
}

interface ReservationPreviousValues {
    id: ID
    name: String
    hotelName: String
    arrivalDate: String
    departureDate: String
}

interface ReservationSubscriptionPayload {
    mutation: Mutationinterface
    node: Reservation
    updatedFields: [String]
    previousValues: ReservationPreviousValues
}

type ReservationSubscriptionWhereInput = (
        $AND: [any], 
        $OR: [any], 
        $NOT: [any], 
        $mutation_in: [any],   
        $updatedFields_contains: String,
        $updatedFields_contains_every: [String],
        $updatedFields_contains_some: [String],
        $node: any,
    ) => {
        $AND: [ReservationSubscriptionWhereInput]
        $OR: [ReservationSubscriptionWhereInput]
        $NOT: [ReservationSubscriptionWhereInput]
        $mutation_in: [Mutationinterface]
        $updatedFields_contains: String
        $updatedFields_contains_every: [String]
        $updatedFields_contains_some: [String]
        $node: ReservationWhereInput
}

type InputReservationUpdate = {
    $name: String
    $hotelName: String
    $arrivalDate: String
    $departureDate: String
}

type ReservationUpdateInput = ($InputReservationUpdate: InputReservationUpdate) => {
    $name: String
    $hotelName: String
    $arrivalDate: String
    $departureDate: String
}

type ReservationUpdateManyMutationInput = {
    name: String
    hotelName: String
    arrivalDate: String
    departureDate: String
}

type ReservationWhereInput = {
    AND: [ReservationWhereInput]
    OR: [ReservationWhereInput]
    NOT: [ReservationWhereInput]
    id: ID
    id_not: ID
    id_in: [ID]
    id_not_in: [ID]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    name: String
    name_not: String
    name_in: [String]
    name_not_in: [String]
    name_lt: String
    name_lte: String
    name_gt: String
    name_gte: String
    name_contains: String
    name_not_contains: String
    name_starts_with: String
    name_not_starts_with: String
    name_ends_with: String
    name_not_ends_with: String
    hotelName: String
    hotelName_not: String
    hotelName_in: [String]
    hotelName_not_in: [String]
    hotelName_lt: String
    hotelName_lte: String
    hotelName_gt: String
    hotelName_gte: String
    hotelName_contains: String
    hotelName_not_contains: String
    hotelName_starts_with: String
    hotelName_not_starts_with: String
    hotelName_ends_with: String
    hotelName_not_ends_with: String
    arrivalDate: String
    arrivalDate_not: String
    arrivalDate_in: [String]
    arrivalDate_not_in: [String]
    arrivalDate_lt: String
    arrivalDate_lte: String
    arrivalDate_gt: String
    arrivalDate_gte: String
    arrivalDate_contains: String
    arrivalDate_not_contains: String
    arrivalDate_starts_with: String
    arrivalDate_not_starts_with: String
    arrivalDate_ends_with: String
    arrivalDate_not_ends_with: String
    departureDate: String
    departureDate_not: String
    departureDate_in: [String]
    departureDate_not_in: [String]
    departureDate_lt: String
    departureDate_lte: String
    departureDate_gt: String
    departureDate_gte: String
    departureDate_contains: String
    departureDate_not_contains: String
    departureDate_starts_with: String
    departureDate_not_starts_with: String
    departureDate_ends_with: String
    departureDate_not_ends_with: String
}

type ReservationWhereUniqueInput = {
    id: ID
}

interface Subscription {
    reservation(where: ReservationSubscriptionWhereInput): ReservationSubscriptionPayload
}

export {
    ReservationInput
}