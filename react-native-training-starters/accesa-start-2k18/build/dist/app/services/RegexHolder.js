var RegexHolder = /** @class */ (function () {
    function RegexHolder() {
    }
    RegexHolder.personNameRegex = RegExp("^[A-Z]+(([',. -][a-z])?[a-z]*)*$");
    RegexHolder.phoneNumberRegex = RegExp("^[+]?[0-9]{10,15}$");
    RegexHolder.passwordRegex = RegExp("^[^\\n\\t ]{8,}$");
    RegexHolder.sumRegex = RegExp("^[1-9]{1}([0-9]){0,}$");
    return RegexHolder;
}());
export default RegexHolder;
//# sourceMappingURL=RegexHolder.js.map