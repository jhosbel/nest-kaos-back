/* eslint-disable prettier/prettier */
import { registerEnumType } from "@nestjs/graphql";

export enum Role {
  PENDING = 'PENDING',
  FINISH = 'FINISH',
}

registerEnumType(Role, {
  name: 'Role',
});
