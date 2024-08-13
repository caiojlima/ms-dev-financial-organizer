export interface IBaseService<T, Y> {
    create(dto: T): Promise<Y>;
    findAll(): Promise<Y[]>;
    findOne(id: number): Promise<Y>;
    update(id: number, userDto: T): Promise<Y>;
    remove(id: number): Promise<void>;
}