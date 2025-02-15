import { model, Query, Schema } from "mongoose";
import { TUser, TRole } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import DocumentQuery from "mongoose";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(TRole),
      default: TRole.USER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// encrypting user password
userSchema.pre("save", async function (next) {
  const result = await User.findOne({ email: this.email });
  if (result) {
    throw new AppError(
      httpStatus.NOT_IMPLEMENTED,
      "This email is already in used!"
    );
  }

  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});


userSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

const User = model<TUser>("user", userSchema);

export default User;
