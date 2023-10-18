/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Key, useState, useRef, RefObject } from "react";
import Uniqueid from "generate-unique-id";
function App() {
	const inputref = useRef<HTMLInputElement>(null);
	const [Todo, setTodo] = useState<Array<any>>([]);

	const handleAdd = (e: any) => {
		const item = inputref.current?.value;
		if (item === "") return;
		setTodo((itemprev) => {
			return [
				...itemprev,
				{
					id: Uniqueid({
						useLetters: false,
						length: 4,
					}),
					nama: item,
					complete: false,
				},
			];
		});
		if (inputref.current) inputref.current.value = "";
	};
	const handleToggle = (id: string) => {
		const newTodos = Todo.map((todo) => {
			if (todo.id === id) {
				return { ...todo, complete: !todo.complete };
			}
			return todo;
		});
		setTodo(newTodos);
	};
	const clearTodoList = () => {
		setTodo([]);
	};

	return (
		<>
			<h1>TodoList</h1>
			<Todoboard toditem={Todo} toggletodo={handleToggle} />
			<div>
				<input type="text" ref={inputref} />
				<button onClick={handleAdd}>Add Todo</button>
				<button onClick={clearTodoList}> Clear todo</button>
			</div>
		</>
	);
}

function Todoboard({
	toditem,
	toggletodo,
}: {
	toditem: Array<object>;
	toggletodo: any;
}) {
	return (
		<>
			<p className="text-red-500">
				{toditem?.map((item: any) => {
					return <Todoitem toggletodo={toggletodo} key={item.id} item={item} />;
				})}
			</p>
		</>
	);
}
function Todoitem({ item, toggletodo }: { item: any; toggletodo: any }) {
	const handletoggle = () => {
		toggletodo(item.id);
	};
	return (
		<div className="hai">
			<input type="checkbox" checked={item.complete} onChange={handletoggle} />
			<label htmlFor="hai">{item.nama}</label>
		</div>
	);
}
export default App;
