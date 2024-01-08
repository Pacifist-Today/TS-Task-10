// 1 Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.

interface IUser {
    name: string
    names: {
        alex: string
        alexes: {
            alehandro: string
            alehandros: {}
        }
    }
}

type TReadOnly<T> = {
    readonly [K in keyof T]: TReadOnly<T[K]>
}

type TUserReadOnly = TReadOnly<IUser>

const alex: TUserReadOnly = {
    name: 'somebody',
    names: {
        alex: 'Alex',
        alexes: {
            alehandro: 'Alehandro',
            alehandros: {}
        }
    }
}

// console.log(alex.names.alexes.alehandro = 'Lexa') //Cannot assign to 'Alehandro' because it is a read-only property.



// 2 Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.

interface IUser2 {
    name?: string
    names?: {
        alex?: string
        alexes?: {
            alehandro?: string
            alehandros?: {}
        }
    }
}

type TRequiredReadOnly<T> = {
    readonly [K in keyof T]-?: TRequiredReadOnly<T[K]>
}

type TUserRequiredReadOnly = TRequiredReadOnly<IUser2>

const alex2: TUserRequiredReadOnly = {
    name: 'somebody',
    names: {
        alex: 'Alex',
        alexes: {
            alehandro: 'Alehandro',
            alehandros: {}
        }
    }
}

const alex22: TUserRequiredReadOnly = {
    name: 'somebody',
    names: {
        alex: 'Alex',
        alexes: {
            // Property 'alehandro' is missing in type '{ alehandros: {}; }'
            alehandros: {}
        }
    }
}



// 3 Вам потрібно сворити тип UpperCaseKeys, який буде приводити всі ключи до верхнього регістру.

type TUpperCase<T> = {
    [K in keyof T & string as `${Capitalize<K>}`]: string | TUpperCase<T[K]>
}

type TUserUpperCase = TUpperCase<IUser>

const alex3:TUserUpperCase  = {
    Name: 'somebody',
    Names: {
        Alex: 'Alex',
        Alexes: {
            Alehandro: 'Alehandro',
            Alehandros: {}
        }
    }
}

const alex33:TUserUpperCase  = {
    name: 'somebody', // error Object literal may only specify known properties, but 'name' does not exist in type 'TUserUpperCase'. Did you mean to write 'Name'?
    names: {
        alex: 'Alex',
        alexes: {
            alehandro: 'Alehandro',
            alehandros: {}
        }
    }
}



// 4 Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

interface IUser4 {
    name: string;
    surname: string;
}

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: {
        value: T[K],
        writable: boolean,
        configurable: boolean,
        enumerable: boolean
    }
}

type UserPropertyDescriptor = ObjectToPropertyDescriptor<IUser4>

const alex4: UserPropertyDescriptor = {
    name: {
        value: 'Alyx',
        configurable: true,
        enumerable: true,
        writable: true
    },
    surname: {
        value: 'Vance',
        configurable: false,
        enumerable: false,
        writable: false
    }
}
