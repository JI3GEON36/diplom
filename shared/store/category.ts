import {create} from 'zustand'


interface State{
    activeId:number,
    setActiveId:(activeId:number) => void;
}

const useCategoryStore = create<State>((set) => ({
    activeId:1,
    setActiveId:(activeId:number) => set({activeId})

}))

export default useCategoryStore;

