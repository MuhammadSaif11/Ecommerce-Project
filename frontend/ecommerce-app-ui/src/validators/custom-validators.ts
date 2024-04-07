import { FormControl, FormGroup } from "@angular/forms";
export class CustomValidators{
    static passwordMatcher(formGroup: FormGroup){
        const newPassword = formGroup.get('new-password');
        const confirmPassword = formGroup.get('confirm-password');
        if(newPassword && confirmPassword && newPassword.value !== confirmPassword.value){
            confirmPassword.setErrors({'passwordMisMatch':true});
            return {'passwordMisMatch':true}
        }
        else{
            confirmPassword.setErrors(null);
            return null
        }
    }

    static requiredFile(formControl: FormControl){
        const files = formControl.value;
        if(files.length===0){
            return {required: true}
        }
        return null;
    }
}