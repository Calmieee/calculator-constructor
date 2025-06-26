import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';
import type { Block, CalculatorState, Mode } from '../types';

interface CalculatorStore {
	mode: Mode;
	availableBlocks: Block[];
	calculatorBlocks: Block[];
	calculatorState: CalculatorState;

	setMode: (mode: Mode) => void;
	moveBlockToCalculator: (blockId: string) => void;
	moveBlockToPalette: (blockId: string) => void;
	reorderCalculatorBlocks: (activeId: string, overId: string) => void;
	inputNumber: (num: string) => void;
	performOperation: (op: 'add' | 'subtract') => void;
	executeCalculation: () => void;
	clear: () => void;
}

const initialCalculatorState: CalculatorState = {
	currentValue: '0',
	previousValue: '',
	operation: null,
	shouldResetDisplay: false,
	displayExpression: '0',
};

const initialBlocks: Block[] = [
	{ id: 'display', type: 'display', title: 'Display', isInCalculator: false },
	{ id: 'operations', type: 'operations', title: 'Operations', isInCalculator: false },
	{ id: 'keyboard', type: 'keyboard', title: 'Keyboard', isInCalculator: false },
	{ id: 'equals', type: 'operations', title: 'Equals', isInCalculator: false },
];

export const useCalculatorStore = create<CalculatorStore>((set) => ({
	mode: 'constructor',
	availableBlocks: initialBlocks,
	calculatorBlocks: [],
	calculatorState: initialCalculatorState,

	setMode: (mode) => set({ mode }),

	moveBlockToCalculator: (blockId) => {
		set((state) => {
			const block = state.availableBlocks.find(b => b.id === blockId);
			if (!block || block.isInCalculator) return state;

			const newAvailableBlocks = state.availableBlocks.map(b =>
				b.id === blockId ? { ...b, isInCalculator: true } : b
			);

			return {
				availableBlocks: newAvailableBlocks,
				calculatorBlocks: [...state.calculatorBlocks, { ...block, isInCalculator: true }]
			};
		});
	},

	moveBlockToPalette: (blockId) => {
		set((state) => {
			const newAvailableBlocks = state.availableBlocks.map(b =>
				b.id === blockId ? { ...b, isInCalculator: false } : b
			);

			return {
				availableBlocks: newAvailableBlocks,
				calculatorBlocks: state.calculatorBlocks.filter(b => b.id !== blockId)
			};
		});
	},

	reorderCalculatorBlocks: (activeId, overId) => {
		set((state) => {
			const oldIndex = state.calculatorBlocks.findIndex(item => item.id === activeId);
			const newIndex = state.calculatorBlocks.findIndex(item => item.id === overId);

			return {
				calculatorBlocks: arrayMove(state.calculatorBlocks, oldIndex, newIndex)
			};
		});
	},

	inputNumber: (num) => {
		set((state) => {
			if (state.mode !== 'runtime') return state;

			const { calculatorState: prev } = state;
			const newValue = prev.shouldResetDisplay ? num :
				prev.currentValue === '0' ? num : prev.currentValue + num;

			const newExpression = prev.operation
				? `${prev.previousValue} ${prev.operation === 'add' ? '+' : '-'} ${newValue}`
				: newValue;

			return {
				calculatorState: {
					...prev,
					currentValue: newValue,
					shouldResetDisplay: false,
					displayExpression: newExpression,
				}
			};
		});
	},

	performOperation: (op) => {
		set((state) => {
			if (state.mode !== 'runtime') return state;

			const calculate = (a: number, b: number, op: 'add' | 'subtract'): number => {
				switch (op) {
					case 'add': return a + b;
					case 'subtract': return a - b;
					default: return b;
				}
			};

			const prev = state.calculatorState;
			if (prev.operation && prev.previousValue && !prev.shouldResetDisplay) {
				const result = calculate(parseFloat(prev.previousValue), parseFloat(prev.currentValue), prev.operation);
				const newExpression = `${result} ${op === 'add' ? '+' : '-'} `;

				return {
					calculatorState: {
						currentValue: result.toString(),
						previousValue: result.toString(),
						operation: op,
						shouldResetDisplay: true,
						displayExpression: newExpression,
					}
				};
			}

			const newExpression = `${prev.currentValue} ${op === 'add' ? '+' : '-'} `;
			return {
				calculatorState: {
					...prev,
					previousValue: prev.currentValue,
					operation: op,
					shouldResetDisplay: true,
					displayExpression: newExpression,
				}
			};
		});
	},

	executeCalculation: () => {
		set((state) => {
			if (state.mode !== 'runtime') return state;

			const calculate = (a: number, b: number, op: 'add' | 'subtract'): number => {
				switch (op) {
					case 'add': return a + b;
					case 'subtract': return a - b;
					default: return b;
				}
			};

			const prev = state.calculatorState;
			if (!prev.operation || !prev.previousValue) return state;

			const result = calculate(parseFloat(prev.previousValue), parseFloat(prev.currentValue), prev.operation);
			return {
				calculatorState: {
					currentValue: result.toString(),
					previousValue: '',
					operation: null,
					shouldResetDisplay: true,
					displayExpression: result.toString(),
				}
			};
		});
	},

	clear: () => {
		set((state) => {
			if (state.mode !== 'runtime') return state;
			return { calculatorState: initialCalculatorState };
		});
	},
}));