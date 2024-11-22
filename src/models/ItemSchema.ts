import { setServers } from "dns";
import mongoose, { Schema, Document, Model } from "mongoose";

interface IItem extends Document {
    workoutName: string,
    reps: number,
    sets: number,
    imageURL: string,
    notes: string
}

const itemSchema = new Schema<IItem>({
    workoutName: { type: String, required: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true },
    imageURL: { type: String, required: true },
    notes: { type: String }
})

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;
