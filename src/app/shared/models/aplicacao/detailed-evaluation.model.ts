export class DetailedEvaluation {
    constructor(
        public averageRating?: number,
        public totalReviews?: number,
        public ratingDistribution?: Rating[],
    ) {
    }
}

export class Rating {
    constructor(
        public rating?: number,
        public count?: number
    ) {
    }
}
