import {Pipe, PipeTransform} from "@angular/core";
import {DatetimeFormat} from "../enum";

@Pipe({ name: "DatetimeFormatter" })
export class DatetimeFormatter implements PipeTransform {
    public transform(val: Date, format?: string): string {
        if (!val) { return String.empty; }
        format = String.isNullOrWhiteSpace(format)?DatetimeFormat.DATE_ONLY:format;
        return new Date(val).format(format);
    }
}