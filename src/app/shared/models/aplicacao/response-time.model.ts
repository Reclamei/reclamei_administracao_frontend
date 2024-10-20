export class ResponseTimeModel {
    constructor(
        public day?: Date,
        public averageResponseTime?: number,
        public quantityAnswered?: number,
    ) {
    }
}
