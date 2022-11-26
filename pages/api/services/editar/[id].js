import nextConnect from "next-connect";
import { update } from "../../../../src/controllers/services";

const route = nextConnect();

route.put(update);

export default route;

export const config = {
  api: {
    bodyParser: false,
  },
};
