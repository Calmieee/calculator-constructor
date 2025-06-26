import CalculatorBuilder from "./pages/CalculatorBuilder.tsx";
import {DndContext} from "@dnd-kit/core";

const App = () => {
	return (
		<>
      <DndContext>
        <CalculatorBuilder />
      </DndContext>
		</>
	);
};

export default App;
