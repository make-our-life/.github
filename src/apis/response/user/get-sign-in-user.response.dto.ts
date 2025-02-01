import { User } from "@src/types/interface";
import ResponseDto from "../response.dto";

export default interface GetSignInUserResposeDto extends ResponseDto, User {
    
}