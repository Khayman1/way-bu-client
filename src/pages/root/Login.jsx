import styled from "styled-components";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import kakaoLogo from "/img/kakao.png";
import googleLogo from "/img/google.png";
import {
  ButtonContainer,
  Button,
  InputBox,
  Input,
  ErrorMsg,
  Label,
} from "../../components/layout/LoginLayout";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px 0;

  @media (max-width: 480px) {
    margin-top: 10px;
    padding: 40px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  padding: 60px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-blue-vivid);

  @media (max-width: 480px) {
    padding: 30px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--color-navy);

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const GreyHR = styled.hr`
  border-top: 1px solid #b9b9b9;
  margin-bottom: 35px;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Check = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Find = styled.div`
  /* background-color: tomato; */
`;

const Remember = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    margin-top: 0px;
  }
`;

const Alert = styled.span`
  display: block;
  margin-top: 20px;
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  font-size: 16px;
`;

const LogoLoginContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 10px;
    gap: 10px;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const KakaoButton = styled(StyledButton)`
  background-color: #fee500;
`;

const GoogleButton = styled(StyledButton)`
  background-color: #ffffff;
  border: 1px solid;
  border-color: gray;
`;

export default function Login() {
  const navigate = useNavigate();
  /* Form */
  // 로그인 폼을 이용한 로그인
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = async (formData) => {
    signInWithEmail(formData);
  };

  async function signInWithEmail(formData) {
    const { data, error } = await client.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setAlert({ cnt: alert.cnt + 1, err: error.message });
      return;
    }
    setLoggedInUser(data.session.user);
    checkLogin();

    const rememberMe = () => formData.rememberMe;

    if (rememberMe) {
      await saveCredentials(formData.email, formData.password);
    }
    navigate("/");
  }

  async function googleLogin() {
    let { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/login",
      },
    });
    if (error) console.error(error);
  }

  async function kakaoLogin() {
    let { data, error } = await client.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: "http://localhost:5173/login",
      },
    });
    if (error) console.log(error);
  }

  async function checkLogin() {
    // 세션 정보를 가져옵니다.
    // 세션으로부터 현재 로그인된 유저 정보를 받고 로그인 유저가 변경될 시 반영
    const { data: authData, error: authError } = await client.auth.getSession();
    if (authError) {
      console.error("Authentication error:", authError);
      return;
    }
    const { session } = authData;
    if (session) {
      const { user } = session;

      if (user) {
        // session으로부터 auth.user 정보를 받아오고 auth.user로 부터 userProfle 정보를 받아옴
        setLoggedInUser(user);
        const { data: userProfile, error: profileError } = await client
          .from("USER_PROFILE")
          .select("*")
          .eq("user_id", user.id);

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
        } else {
          setLoggedInUserProfile(userProfile[0]);
        }
      }
    } else {
      console.log("No active session found");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (loggedInUser) navigate("/");
  }, [loggedInUser]);

  /* Login Error 처리 */
  const [alert, setAlert] = useState({ cnt: 0, err: null });

  const saveCredentials = async (email, password) => {
    try {
      const { data, error } = await client
        .from("credentials")
        .insert([{ email, password }]);
      if (error) {
        console.error("Error saving credentials:", error.message);
      }
    } catch (error) {
      console.error("Error saving credentials:", error.message);
    }
  };

  return (
    !loggedInUser && (
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>로그인</Title>
          <GreyHR />
          <InputBox>
            <Label htmlFor="email">이메일</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              required
            />
            {errors?.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
          </InputBox>
          <InputBox>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자리 입니다.",
                },
              })}
              id="password"
              type="password"
              required
              placeholder="비밀번호를 입력하세요"
            />
            {errors?.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
          </InputBox>
          <Check>
            <Remember>
              <input
                type="checkbox"
                id="remember"
                {...register("rememberMe")}
              />
              <Label htmlFor="remember" style={{ fontSize: "0.7rem" }}>
                기억하기
              </Label>
            </Remember>
            <Find>
              <Link to="/find-id" style={{ fontSize: "0.7rem" }}>
                이메일 찾기
              </Link>{" "}
              |{" "}
              <Link to="/find-pwd" style={{ fontSize: "0.7rem" }}>
                비밀번호 찾기
              </Link>
            </Find>
          </Check>
          <ButtonContainer>
            <Button type="submit">로그인</Button>
            <Link to="/signup" style={{ fontSize: "0.7rem" }}>
              회원가입
            </Link>
          </ButtonContainer>
          <LogoLoginContainer>
            <KakaoButton onClick={kakaoLogin}>
              <img src={kakaoLogo} alt="카카오 로그인" />
            </KakaoButton>
            <GoogleButton onClick={googleLogin}>
              <img src={googleLogo} alt="구글 로그인" />
            </GoogleButton>
          </LogoLoginContainer>
        </Form>
      </Wrapper>
    )
  );
}

// const LoggedPage = () => {
//   if (isLoading) return <>Loading...</>;

//   const user = loggedInUserProfile ? loggedInUserProfile : null;
//   const userName = user
//     ? user.user_nickname
//     : loggedInUser.user_metadata.name;
//   const avatarUrl = user
//     ? user.avatar_url
//     : loggedInUser.user_metadata.avatar_url;
//   const birthDate = user ? user.birth_date : null;
//   const joinPath = user ? user.join_path : null;

//   return (
//     <Wrapper>
//       <p>{loggedInUser.email}</p>
//       <p>{userName}</p>
//       <img width={"150px"} height={"200px"} src={avatarUrl} alt="프사" />
//       <p>{birthDate}</p>
//       <p>{joinPath}</p>
//       <form action="/">
//         <input
//           type="file"
//           accept="image/jpeg, image/png"
//           name="input_avatar"
//           onChange={handleImage}
//         />
//       </form>
//       <button onClick={uploadFile}>변경</button>
//     </Wrapper>
//   );
// };
