export interface IMapper<T, Y> {
    fromEntity(entity: T): Y
}