import {RxFormBuilder, RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {FormGroup} from "@angular/forms";
import {Injectable} from "@angular/core";
import {Type} from "@rxweb/reactive-form-validators/util";

@Injectable({ providedIn: RxReactiveFormsModule  })
export class FormService {
  constructor(private rxFormBuilder: RxFormBuilder) {}

  makeBlankForm<T>(model: Type<T> | { [key: string]: any; }, entityObject?: { [key: string]: any; } ) : FormGroup{
    return this.rxFormBuilder.formGroup(model);
  }

  makeFormWithData<T>(model: Type<T> | { [key: string]: any; }, entityObject?: { [key: string]: any; }) : FormGroup{
    return this.rxFormBuilder.formGroup(model,entityObject);
  }

}
