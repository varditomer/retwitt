import { ChangeEvent, useEffect, useState } from "react";

interface returnTypeRegister<T>{
	type?: string;
	  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	  name: keyof T;
	  id: keyof T;
	  value: string | number | undefined;
	}
	

export const useFormRegister = <T>(initialState: T, cb: Function) => {
	const [fields, setFields] = useState(initialState);

	useEffect(() => {
		if(!fields) return
		cb?.(fields);
	}, [fields]);

	const handleChange = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const target = ev.target;
		const field = target.name;
		const value: any = target.type === 'number' ? +target.value || '' : target.value;
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
