export interface PropsType {
}

export interface StateType {
}

// 리액트의 생명주기

// 마운트시
// constructor()
// static getDerivedStateFromProps()
// render()
// componentDidMount()

// 업데이트 시
// static getDerivedStateFromProps()
// shouldComponentUpdate()
// render()
// componentDidUpdate()

export default class Component<P extends PropsType, S extends StateType> {
    target: Element;
    props: P;
    state: S;

    constructor(target: Element, props: P) {
        this.target = target;
        this.props = props;
        this.state = {} as S;
        this.setup()
        this.mount()
        this.setEvent();
    }

    setup() {
    }

    template() {
        return ""
    }

    render() {
        const template = this.template();
        if (template) {
            this.target.innerHTML = template;
        }
    }

    mount() {
        this.render();
        this.didMount();
    }

    update() {
        this.render();
        this.didUpdate();
    }

    // 생명주기 메서드
    didMount() {
    }

    didUpdate() {
    }

    setState(newState: Partial<S>) {
        const nextState = {...this.state, ...newState}
        if (JSON.stringify(this.state) === JSON.stringify(nextState)){
            return;
        }
        this.state = newState;
        this.update();
    }


    setEvent() {
    }

    addEvent(eventType: string, selector:string, callback:Function) {
        const children: Element[] = [...this.target.querySelectorAll(selector)];
        const isTarget = (target: Element)=>
            children.includes(target) || target.closest(selector);
        this.target.addEventListener(eventType, (event:any)=> {
            if(!isTarget(event.target)) return false;
            callback(event);
        })
    }


}