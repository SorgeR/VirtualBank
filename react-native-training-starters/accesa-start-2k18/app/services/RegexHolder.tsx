
export default class RegexHolder{

    static personNameRegex=RegExp("^[A-Z]+(([',. -][a-z])?[a-z]*)*$")
    static phoneNumberRegex = RegExp("^[+]?[0-9]{10,15}$")
    static passwordRegex = RegExp("^[^\\n\\t ]{8,}$")
    static sumRegex=RegExp("^[1-9]{1}([0-9]){0,}$")

}

