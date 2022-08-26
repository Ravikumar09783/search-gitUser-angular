import { Component, ElementRef, ViewChild } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import {debounceTime,filter, fromEvent,map,Observable,switchMap,tap,} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: any;
  @ViewChild('search', { static: true })
  search!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    const searchObs = fromEvent(this.search.nativeElement, 'input')
    .pipe(
      debounceTime(1000),
      filter((e:any)=>e.target.value !=''),
      switchMap((e: any) => {
        return ajax(`https://api.github.com/search/users?q=${e.target.value}`)
      }),
      map((ajaxResponse:any)=>ajaxResponse.response.items)
    );

    searchObs.subscribe((value: any) => {
      console.log("value form api",value);
      // console.log(this.user)
      this.user = value;
    });

    // const pizzaObservable = new Observable((observer) => {
    //   observer.next({ name: 'Ravi Kumar', age: 25, height: '7' });
    //   observer.next({ name: 'Deepak Negi', age: 25, height: '7' });
    //   observer.next({ name: 'Shubham Thakur', age: 24, height: '7' });
    //   observer.next({ name: 'Vishal Rana', age: 25, height: '7' });
    //   observer.complete();
    // }).pipe(
    //   tap((pizza: any) => {
    //     if (pizza.height == 6 ) {
    //       throw new Error('You are  selected');
    //     }
    //   }),
    //   filter((pizza: any) => pizza.age == 25),
    //   map((pizza: any) => pizza.name)
    // );

    // pizzaObservable.subscribe({
    //   next: (value) => console.log(value),
    //   error: (err) => console.log(err.message),
    //   complete: () => console.log('Task is completed'),

    // pizzaObservable.subscribe(
    //   (value) => console.log(value),
    //   (err) => console.log(err.message),
    //   () => console.log('Task is completed')
    // );
  }
}
// function ajax(arg0: string): any {
//   throw new Error('Function not implemented.');
// }
