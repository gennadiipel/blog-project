import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'excerpt'
})

export class ExcerptPipe implements PipeTransform {
    transform(text: string, maxLength: number = 32, end: string = '...') {
        return (text.length > maxLength) ? text.substr(0, maxLength) + end : text;
    }
    
}