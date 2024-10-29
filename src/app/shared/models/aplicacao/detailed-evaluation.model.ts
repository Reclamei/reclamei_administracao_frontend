export class DetailedEvaluation {
    constructor(
        public averageRating?: number,
        public totalReviews?: number,
        public ratingDistribution?: Rating[],
    ) {
        this.ratingDistribution = [];
    }
}

export class Rating {
    constructor(
        public rating?: number,
        public count?: number
    ) {
    }
}
