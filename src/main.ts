// Сделать несколько запросов к открытому api, отобразить на веб странице результат, обработать ошибки
function fetchData(url: string) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(data => {
            return data
        })
}


fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(({id, title, body}) => {
        document.querySelector('.title')!.textContent = title
        document.querySelector('.descr')!.textContent = body
        document.querySelector('.id')!.textContent = id
    })

// Сделать вариант с async-await
async function fetchData2(url: string) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
        .then(data => {
            return data
        })

}

// Добавить кнопки отправки и отмены запроса

const sendButton: HTMLElement = document.querySelector('.b-1')!
const cancelButton: HTMLElement = document.querySelector('.b-2')!


sendButton.addEventListener('click', async () => {
    const controller: AbortController = new AbortController();

    cancelButton.addEventListener('click', () => {
        controller.abort()
    })

    try {
        console.log('Start fetching')
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/3?_delay=5000', {signal: controller.signal})
        console.log('end fetching')
        return await response.json()
            .then(({id, title, body}) => {
                document.querySelector('.title')!.textContent = title
                document.querySelector('.descr')!.textContent = body
                document.querySelector('.id')!.textContent = id
            })
    } catch (e) {
        // если запрос был прерван
        if (e.name === 'AbortError') {
            console.log('Request aborted')
        } else {
            console.error(e)
        }
    }
});


// Сделать ещё один того же самого используя RxJS

import {timer} from "rxjs";
import {fromFetch} from "rxjs/fetch";
import {mergeMap, takeUntil} from "rxjs/operators";

fromFetch('https://jsonplaceholder.typicode.com/posts/13?_delay=5000')
    .pipe(
        mergeMap((response) => response.text()),
        takeUntil(timer(1000))
    )
    .subscribe((text) => console.log(text));


// Написать регулярное выражение ищущее в тексте из textarea повторы первого слова, выводить номера слов повторов под textarea
const regExpBtn: HTMLElement = document.querySelector('.b-3')!
regExpBtn.addEventListener('click', () => {
    const textarea: HTMLInputElement = document.querySelector('.textarea')! as HTMLInputElement
    const text: string = textarea.value

    const repeatWordRegExp: RegExp = new RegExp('(\\b\\w+\\b)(?=.*\\b\\1\\b)', 'gi')
    const str1 = repeatWordRegExp.exec(text)

    console.log(str1?.index)
})


function log(target, key, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        let result = originalMethod.apply(this, args);
        console.log(result);
        return result;
    };

    return descriptor;
}

class Person {
     constructor(
        private firstName: string,
        private lastName: string
    ) {
    }

    @log
    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}


const person: Person = new Person('Ded', 'Maxim')
person.getFullName()


// в js
import {sumjs} from "./sum";

export function sum1(a: number, b: number) {
    return a + b;
}

console.log(sumjs(2, 3))
