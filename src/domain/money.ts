const moneyRegex = /^\d+\.\d{2}$/;

class Money {
    private amount: string;

    constructor(amount: string) {
        if (!moneyRegex.test(amount)) {
            throw new Error("Valor monetário inválido");
        }

        this.amount = amount;
    }
}