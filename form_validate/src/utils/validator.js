import methods from 'validator';
class Validator{
    constructor(rules){
        this.rules = rules;
        this.initiate();
    }
    initiate(){
        this.isValid = true;
        this.error = {}
    }
    validate(state){
        this.initiate();
        this.rules.forEach((rule) => {
            if(this.errors[rule.field]) return;
            const fieldValue = state[rule.field] || '';
            const args = rule.args || [];
            const validationMethod = typeof rule.methods === "string" ? methods[rule.methods] : rule.methods;
            if(validationMethod(fieldValue, ...args, state) !== rule.validWhen){
                this.error[rule.field] = rule.message;
                this.isValid = false;
            };
        });
        return this.error;
    }
}export default Validator;