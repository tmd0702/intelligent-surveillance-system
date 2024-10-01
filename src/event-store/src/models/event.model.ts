import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IEvent extends Document {
        id: string; // Change aggregateId to id
        eventType: string;
        timestamp: Date;
        payload: Record<string, any>;
        version: number;
}

const eventSchema: Schema = new Schema({
        id: {
                type: String,
                default: uuidv4,
                required: true,
                unique: true
        },
        eventType: {
                type: String,
                required: true,
        },
        timestamp: {
                type: Date,
                default: Date.now,
        },
        payload: {
                type: Object,
                required: true,
        },
});

const EventModel = mongoose.model<IEvent>('Event', eventSchema);

export default EventModel;
