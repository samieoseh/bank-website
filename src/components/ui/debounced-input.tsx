import {
  ChangeEvent,
  RefAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Input, InputProps } from "./input";
import { debounce } from "lodash";
import { JSX } from "react/jsx-runtime";
import axios from "axios";
import { LucideCheckCircle } from "lucide-react";

interface UserData {
  fullName: string;
  id: string;
  username: string;
}

interface DebouncedInputProps {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
}

export default function DebouncedInput(
  props: JSX.IntrinsicAttributes &
    DebouncedInputProps &
    InputProps &
    RefAttributes<HTMLInputElement>
) {
  const [debouncedInput, setDebouncedInput] = useState(props.value || "");

  //const [userData, setUserData] = useState<UserData | null>(null);

  async function handleDebounceFn(inputValue: string) {
    try {
      const response = await axios.get(
        `/api/transactions/verify-and-get-user/${inputValue}`
      );
      const data = await response.data;
      props.setUserData(data);
    } catch (error) {
      console.error(error);
      props.setUserData(null);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (props.onChange) {
      props.onChange(event);
    }

    setDebouncedInput(event.target.value);
    debounceFn(event.target.value);
  }

  useEffect(() => {
    setDebouncedInput(props.value || "");
  }, [props.value]);

  return (
    <div>
      <Input {...props} value={debouncedInput} onChange={handleChange} />
      {props.userData && (
        <div className="flex items-center text-sm my-1 px-4 py-2 rounded-md gap-x-1 w-full bg-[#00ff00]/10">
          <LucideCheckCircle
            fill="green"
            stroke="#fff"
            height={22}
            width={22}
          />
          <p className="text-primary">{props.userData.fullName}</p>
        </div>
      )}
    </div>
  );
}
