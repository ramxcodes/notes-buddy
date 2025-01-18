import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  university: { type: String, required: false },
  degree: { type: String, required: false },
  planTier: { type: String, default: 'Free' },
});

const User = models.User || model('User', UserSchema);

export default User;
