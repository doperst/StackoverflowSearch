import { Observable } from "rxjs";

export type QueryFunction = (page: number, sortBy: string, sortDir: string) => Observable<any>;