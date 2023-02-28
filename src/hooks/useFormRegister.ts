import { ChangeEvent, useEffect, useState } from "react";

interface returnTypeRegister<T> {
	type?: string;
	onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	name: keyof T;
	id: keyof T;
	value: string | number | undefined;
}


export const useFormRegister = <T>(initialState: T, cb: Function) => {
	const [fields, setFields] = useState(initialState);

	useEffect(() => {
		if (!fields) return
		cb?.(fields);
	}, [fields]);

	const handleChange = async (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const target = ev.target;
		const field = target.name;
		let value: any
		switch (target.type) {
			case 'number':
				value = +target.value || ''
				break;
			default:
				value = target.value
				break;
		}
		setFields(prefFields => ({ ...prefFields, [field]: value }));
	};

	const register = (field: keyof T): returnTypeRegister<T> => {

		return {
			onChange: handleChange,
			name: field,
			id: field,
			value: fields[field] as any,
		}
	};

	const resetForm = () => {
		setFields(() => initialState);
	};
	return { register, resetForm, fields };
};
