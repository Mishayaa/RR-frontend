import useUpdateAboutRequest from "@api/user/updateAboutRequest";
import useUpdateAvatarRequest from "@api/user/updateAvatarRequest";
import Form from "@components/atomic/form/Form";
import FormButton from "@components/atomic/form/FormButton";
import FormInput from "@components/atomic/form/FormInput";
import FormTexarea from "@components/atomic/form/FormTextarea";
import { userStore } from "@stores/userStore"
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";

interface UserSettingsProps {
  id: number
}

export default function UserSetting({ id }: UserSettingsProps) {
  const user = userStore(state => state.user);

  if (user.id !== Number(id)) return (<div>Не твои настройки, дружок.</div>);

  return (
    <div class="flex flex-row gap-2 w-full">
     {/*//<AvatarUpdate />*/}
      <UpdateAbout />
    </div>
  );
}

function UpdateAbout() {
  const [about, setAbout] = useState(null);
  const [user, setUser] = userStore(state => [state.user, state.set]);
  const { call, isLoading } = useUpdateAboutRequest(
    user.id,
    { about },
    data => { setUser(data); toast.success("Description updated!"); },
    error => toast.error(error.message),
  );

  useEffect(() => setAbout(user.about), []);

  function onSubmit(event: Event) {
    event.preventDefault();
    call();
  }

  return (
    <div class="w-4/6">
      <Form onSubmit={onSubmit}>
        <FormTexarea
          value={about}
          onInput={t => setAbout(t.value)}
          placeholder="..." maxLength={1000} rows={5}
        />
        <FormButton
          isLoading={isLoading}
          text="Update"
        />
      </Form>
    </div>
  );
}

function AvatarUpdate() {
  const [formData, setFormData] = useState(() => new FormData());
  const [user, setUser] = userStore(state => [state.user, state.set]);
  const { call, isLoading } = useUpdateAvatarRequest(
    formData,
    // reload bc url doesn't change if avatar already exists
    data => { setUser({ ...data }); window.location.reload(); },
    error => toast.error(error.message),
  );

  function onSubmit(event: Event) {
    event.preventDefault();

    if (formData.get("image") === null) return;
    if ((formData.get("image") as Blob).size > 8000000) { toast.error("Слишком большой файл.\nМаксимум 8МБ."); return; }

    call();
  }

  // return (
  //   <div class="w-2/6">
  //     <Form onSubmit={onSubmit}>
  //       <img
  //         id="avatar_preview"
  //         class="h-auto rounded"
  //         width="100%"
  //         height={96}
  //         src={user.avatar}
  //         placeholder="Аватар"
  //         alt="Аватар"
  //       />
  //       <FormInput
  //         type="file"
  //         accept=".jpeg,.jpg,.png,.gif"
  //         onInput={
  //           t => {
  //             (document.getElementById("avatar_preview") as HTMLImageElement).src = URL.createObjectURL(t.files[0]);
  //             formData.set("image", t.files[0]);
  //             setFormData(formData);
  //           }
  //         }
  //       />
  //       <FormButton
  //         isLoading={isLoading}
  //         text="Обновить аватар"
  //       />
  //     </Form>
  //   </div>
  // );
}

