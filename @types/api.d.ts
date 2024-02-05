import { TApiDraftData } from "../src/api/types";

declare module "*.json" {
    const dataset: TApiDraftData;
    export default dataset;
}
