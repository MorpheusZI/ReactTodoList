/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Key, useState, useRef, RefObject } from "react";
import Uniqueid from "generate-unique-id";
const id = Uniqueid({
	length: 4,
	useLetters: false,
});
console.log(id);
function App() {
	const inputref = useRef<HTMLInputElement>(null);
	const [Todo, setTodo] = useState<Array<object>>([{}]);

	const handleAdd = (e: any) => {
		const item = inputref.current?.value;
		if (item === "") return;
		setTodo((prevTodo) => {
			return [...prevTodo, { id: id, nama: item, complete: false }];
		});
		if (inputref.current) inputref.current.value = "";
	};
	return (
		<>
			<Todoboard toditem={Todo} />
			<div>
				<input type="text" ref={inputref} />
				<button onClick={handleAdd}>Add Todo</button>
				<h1>TodoList</h1>
			</div>
		</>
	);
}

function Todoboard({ toditem }: { toditem: Array<object> }) {
	return (
		<>
			<p className="text-red-500">
				{toditem?.map((item: any) => {
					return <Todoitem key={item.id} item={item} />;
				})}
			</p>
		</>
	);
}
function Todoitem({ item }: { item: any }) {
	return (
		<div className="hai">
			<input type="checkbox" checked={item.complete} />
			<label htmlFor="hai">{item.nama}</label>
		</div>
	);
}
export default App;
