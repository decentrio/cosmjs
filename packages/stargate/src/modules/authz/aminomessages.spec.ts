import { MsgExec, MsgGrant, MsgRevoke } from "cosmjs-types/cosmos/authz/v1beta1/tx";
import { SendAuthorization } from "cosmjs-types/cosmos/bank/v1beta1/authz";
import { AminoConverters } from "src/aminotypes";

import { AminoMsgGrant, createAuthzAminoConverters } from "./aminomessages";
import { Timestamp } from "cosmjs-types/google/protobuf/timestamp";
import { AminoTypes } from "../../aminotypes";

describe("Authz Amino Converters", () => {
  describe("fromAmino", () => {
    it("work with MsgGrant", () => {
      // Define a sample AminoMsgGrant object
      const msg: AminoMsgGrant = {
        type: "cosmos-sdk/MsgGrant",
        value: {
          granter: "cosmos1p7v0km9ydt0y9nszlesjy8elzqc4n2v0w4xh2p",
          grantee: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          grant: {
            authorization: {
              type: "cosmos-sdk/SendAuthorization",
              value: {
                spendLimit: [{ denom: "ustake", amount: "1000" }],
              },
            },
            expiration: Timestamp.fromPartial({
              seconds: BigInt(1596300000),
              nanos: 0,
            }),
          },
        },
      };

      const msgGrant = new AminoTypes(createAuthzAminoConverters()).fromAmino(msg);
      const expectedValue: MsgGrant = {
        granter: "cosmos1p7v0km9ydt0y9nszlesjy8elzqc4n2v0w4xh2p",
        grantee: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        grant: {
          authorization: {
            typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
            value: SendAuthorization.encode({
              spendLimit: [{ denom: "ustake", amount: "1000" }],
              allowList: [],
            }).finish(),
          },
          expiration: {
            seconds: BigInt(1596300000),
            nanos: 0,
          },
        },
      };
      expect(msgGrant).toEqual({
        typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
        value: expectedValue,
      });
    });

    // it("toAmino", () => {});
  });

  // describe("MsgExec", () => {});

  // describe("MsgRevoke", () => {});
});
