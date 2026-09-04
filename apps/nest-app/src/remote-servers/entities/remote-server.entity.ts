import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum RemoteServerStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    UNKNOWN = 'unknown'
}


@Entity()
export class RemoteServer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ownerId: string;

    @Column()
    name: string;

    @Column({nullable: true})
    description?: string;

    @Column({nullable: true})
    type?: string;

    @Column({type: 'simple-json'})
    config: Record<string, any>;

    
    @Column() //{type: 'simple-enum', enum: RemoteServerStatus, default: RemoteServerStatus.UNKNOWN}
    status: RemoteServerStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    

}
