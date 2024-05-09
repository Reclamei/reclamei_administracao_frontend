export class CommonFunctions {

    public static camelCaseToSnakeCase(obj: any): any {
        const snakeCaseObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const snakeCaseKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
                snakeCaseObj[snakeCaseKey] = obj[key];
            }
        }
        return snakeCaseObj;
    }

}
