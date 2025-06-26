import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type {Block, Mode} from '../types';

export const SortableBlock = ({ children, mode, onDoubleClick }: {
	block: Block;
	children: React.ReactNode;
	mode: Mode;
	onDoubleClick?: () => void;
}) => {
	return (
		<div
			className="relative"
			onDoubleClick={() => {
				if (mode === 'constructor' && onDoubleClick) {
					onDoubleClick();
				}
			}}
		>
			{children}
		</div>
	);
};

export const DraggableBlock = ({ block, children, mode }: {
	block: Block;
	children: React.ReactNode;
	mode?: Mode;
}) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id: block.id,
		disabled: block.isInCalculator || mode === 'runtime',
	});

	const style = transform ? {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		opacity: isDragging ? 0.5 : 1,
	} : undefined;

	const isDisabled = block.isInCalculator || mode === 'runtime';

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...(!isDisabled ? listeners : {})}
			{...(!isDisabled ? attributes : {})}
			className={`${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}`}
		>
			{children}
		</div>
	);
};

export const DropPlaceholder = ({ isOver, children }: { isOver: boolean; children: React.ReactNode }) => (
	<div className={`transition-all duration-200 ${isOver ? 'bg-blue-50 border-blue-300 scale-105' : ''}`}>
		{children}
	</div>
);