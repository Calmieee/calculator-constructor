import {useCallback, useEffect, useState} from 'react';
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, closestCenter } from '@dnd-kit/core';
import { useCalculatorStore } from '../store/CalculatorStore.ts';
//TODO: объединить импорты в один
import { BlockPalette } from '../components/BlockPalette.tsx';
import { CalculatorContainer } from '../components/CalculatorContainer.tsx';
import { ModeToggle } from '../components/ModeToggle.tsx';
import {OperationsBlock} from "../components/calculatorBlocks/OperationsBlock.tsx";
import {DisplayBlock} from "../components/calculatorBlocks/DisplayBlock.tsx";
import {KeyboardBlock} from "../components/calculatorBlocks/KeyboardBlock.tsx";
import {EqualsBlock} from "../components/calculatorBlocks/EqualsBlock.tsx";

export default function CalculatorBuilder() {
	const {
		mode,
		setMode,
		availableBlocks,
		calculatorBlocks,
		calculatorState,
		moveBlockToCalculator,
		moveBlockToPalette,
		inputNumber,
		performOperation,
		executeCalculation,
		clear,
	} = useCalculatorStore();

	const [activeId, setActiveId] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => {

		if (mode === 'runtime') {
			return;
		}
		setActiveId(event.active.id as string);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) {
			setActiveId(null);
			return;
		}

		if (over.id === 'calculator-container') {
			moveBlockToCalculator(active.id as string);
		}

		setActiveId(null);
	};

	const handleBlockDoubleClick = useCallback((blockId: string) => {
		if (mode === 'constructor') {
			moveBlockToPalette(blockId);
		}
	},[mode, moveBlockToPalette]);

	useEffect(() => {
		if (mode === 'constructor') {
			const handleGlobalDoubleClick = (e: MouseEvent) => {
				const target = e.target as HTMLElement;
				const blockElement = target.closest('.sortable-block');

				if (blockElement) {
					const blockId = blockElement.getAttribute('data-block-id');
					if (blockId) {
						handleBlockDoubleClick(blockId);
					}
				}
			};

			document.addEventListener('dblclick', handleGlobalDoubleClick);
			return () => document.removeEventListener('dblclick', handleGlobalDoubleClick);
		}
	}, [mode, calculatorBlocks, handleBlockDoubleClick]);


	const activeBlock = availableBlocks.find(b => b.id === activeId);

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="min-h-screen bg-gray-50 p-6">
				<div className="max-w-7xl mx-auto">
					<div className="flex  gap-15 md:gap-85  items-center mb-6">
						<h1 className="text-2xl font-bold text-gray-900">Конструктор калькулятора</h1>
						<ModeToggle mode={mode} onModeChange={setMode} />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{mode === 'constructor' && (
							<div>
								<BlockPalette blocks={availableBlocks} mode={mode} />
							</div>
						)}

						<div className={mode === 'constructor' ? '' : 'lg:col-start-2'}>
							<CalculatorContainer
								blocks={calculatorBlocks}
								calculatorState={calculatorState}
								onBlockDoubleClick={handleBlockDoubleClick}
								onNumberClick={inputNumber}
								onOperation={performOperation}
								onEquals={executeCalculation}
								onClear={clear}
								mode={mode}
							/>
						</div>
					</div>
				</div>
			</div>

			<DragOverlay>
				{activeBlock && mode === 'constructor' && (
					<div className="opacity-90">
						{activeBlock.type === 'display' && <DisplayBlock value="0" isInCalculator={false} />}
						{activeBlock.type === 'keyboard' && <KeyboardBlock onNumberClick={() => {}} disabled={true} isInCalculator={false} />}
						{activeBlock.type === 'operations' && activeBlock.id === 'operations' && (
							<OperationsBlock onOperation={() => {}} onClear={() => {}} disabled={true} isInCalculator={false} />
						)}
						{activeBlock.type === 'operations' && activeBlock.id === 'equals' && (
							<EqualsBlock onEquals={() => {}} disabled={true} isInCalculator={false} />
						)}
					</div>
				)}
			</DragOverlay>
		</DndContext>
	);
}