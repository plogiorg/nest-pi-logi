export interface ConfigDTO {
    ENV: {
        IS_PRODUCTION: boolean;
    };
    APP: {
        NAME: string;
        VERSION: string;
        PORT: number;
    };
    DATABASE: DatabaseConfigDTO;
    LOGGING?: LoggingConfigDTO;
}
export interface DatabaseConfigDTO {
    HOST: string,
    PORT: number,
    USER: string,
    PASSWORD: string
    NAME: string
};

export interface LoggingConfigDTO {
    LEVEL: string,
};


