import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { DateConfig } from "../models/config/date-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { ObjectMaker } from "../util/object-maker";
import { DecoratorName } from "../util/decorator-name";
import { AnnotationTypes } from "../core/validator.static";
import { RegExRule, DateProvider } from "../util/index";

export function maxDateValidator(config:DateConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        var dateProvider = new DateProvider();
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                if (dateProvider.isValid(controlValue)) {
                    let maxDate = config.value;
                    let currentValueDate = dateProvider.getDate(controlValue);
                    if (!(maxDate >= currentValueDate))
                        return ObjectMaker.toJson(AnnotationTypes.maxDate, config.message || null, [control.value])
                } else
                    return ObjectMaker.toJson(AnnotationTypes.maxDate, config.message || null, [control.value])
                
            }
        }
        return ObjectMaker.null();
    }
}
