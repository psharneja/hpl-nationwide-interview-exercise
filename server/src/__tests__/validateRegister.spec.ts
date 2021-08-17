import { PersonPasswordInput } from "../utils/PersonPasswordInput";
import { validateRegister } from "../utils/validateRegister";

describe('field checks for registration form', function (){
    it('should return username length error', function() {
        const options: PersonPasswordInput = {
            username: '12',
            password: '23'
        }
        const result = validateRegister(options);
        expect(result?.length).toBe(1);
        expect(result![0].field).toBe("username");
        expect(result![0].message).toBe("length has to be more than 2 character");

    })

    it('should return username validation error', function() {
        const options: PersonPasswordInput = {
            username: '12@.com',
            password: '23'
        }
        const result = validateRegister(options);
        expect(result?.length).toBe(1);
        expect(result![0].field).toBe("username");
        expect(result![0].message).toBe("cannot include @ sign");

    })

    it('should return passsword length error', function() {
        const options: PersonPasswordInput = {
            username: '12com',
            password: '23'
        }
        const result = validateRegister(options);
        expect(result?.length).toBe(1);
        expect(result![0].field).toBe("password");
        expect(result![0].message).toBe("password has to be more than 2");

    })

    it('should return no error', function() {
        const options: PersonPasswordInput = {
            username: '1hj2com',
            password: '23fgh'
        }
        const result = validateRegister(options);
        expect(result).toBe(null);

    })
})