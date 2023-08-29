
export interface JsonFormValidators {
    min?: number;
    max?: number;
    required?: boolean;
    requiredTrue?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    nullValidator?: boolean;
  }
  export interface JsonFormControlOptions {
    min?: any;
    max?: string;
    step?: string;
    icon?: string;
  }
  export interface JsonFormControls {
    name: string;
    label: string;
    value: any; // string|number|boolean;
    valueOptions:ValueOptions[];
    type: string;
    active:boolean;
    displayOrder:number;
    disabled:boolean;
    options?: JsonFormControlOptions;
    required: boolean;
    validators: JsonFormValidators;
    events:any;
    library:any;
    addMore?:boolean;
  }
  export interface JsonFormData {
    formHeader: string;
    controls: JsonFormControls[];
  }
  
  export interface ValueOptions{
    id?:number,
    key?:string,
    displayName?:string
  }
  
  export class DocumentDetail {
    fileName: string = '';
    document: any;
    documentId: number = 0;
    filePath: string = '';
  }
  