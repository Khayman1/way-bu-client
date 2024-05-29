import { useEffect, useState } from "react";
import styled from "styled-components";
import { client } from "../../../../libs/supabase";

const Wrapper = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  svg {
    @media only screen and (max-width: 376px) {
      width: 14px;
    }
  }
  span {
    font-size: 16px;
    height: 100%;
    @media only screen and (max-width: 376px) {
      font-size: 14px;
    }
  }
`;

export default function StarAvgContainer({ programId, width }) {
  /* Review 별 불러오기 */
  const [reviews, setReviews] = useState();
  const [reviewLoading, setReviewLoading] = useState(true);

  // PROGRAM_REVIEW 에서 program_id가 programId와 같은 데이터 받음
  const getReviews = async () => {
    const { data, error } = await client
      .from("PROGRAM_REVIEW")
      .select()
      .eq("program_id", programId);
    if (error) {
      console.log(error);
      return;
    }
    setReviews(data);
    setReviewLoading(false);
  };

  // 컴포넌트 마운트 시 getReviews 실행
  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Wrapper>
      {reviewLoading
        ? "Loading..."
        : reviews.length === 0
        ? // reviews가 존재하지 않으면 빈 별 5개 출력
          [...Array(5)].map((_, i) => (
            <svg
              key={"empty" + i}
              width={width ? width : "16"}
              height={width ? width : "16"}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7777 6.78426L12.0295 10.1448L13.1747 15.1687C13.205 15.2978 13.1978 15.4334 13.154 15.5582C13.1102 15.6831 13.0318 15.7916 12.9286 15.8701C12.8255 15.9486 12.7023 15.9936 12.5746 15.9994C12.4469 16.0051 12.3204 15.9714 12.2111 15.9024L7.9996 13.2092L3.78807 15.9016C3.6788 15.9706 3.55232 16.0043 3.42461 15.9986C3.2969 15.9928 3.17369 15.9478 3.07057 15.8693C2.96744 15.7908 2.88902 15.6823 2.84522 15.5574C2.80141 15.4326 2.79419 15.297 2.82447 15.1679L3.96971 10.144L0.221509 6.78346C0.125943 6.69623 0.0570432 6.58181 0.0233152 6.45433C-0.0104127 6.32685 -0.00749197 6.1919 0.0317169 6.06612C0.0709257 5.94035 0.144706 5.82927 0.243949 5.74659C0.343192 5.66391 0.463553 5.61326 0.590172 5.60088L5.50901 5.18482L7.40389 0.416108C7.4522 0.29308 7.53466 0.187798 7.64076 0.113688C7.74685 0.0395787 7.87178 0 7.9996 0C8.12743 0 8.25235 0.0395787 8.35845 0.113688C8.46455 0.187798 8.54701 0.29308 8.59531 0.416108L10.4902 5.18482L15.409 5.60088C15.5358 5.61311 15.6564 5.66372 15.7558 5.74645C15.8552 5.82918 15.9291 5.94039 15.9683 6.06633C16.0076 6.19226 16.0104 6.32739 15.9765 6.455C15.9426 6.5826 15.8735 6.69708 15.7777 6.78426Z"
                fill="#B9B9B9"
              />
            </svg>
          ))
        : // reviews가 존재하면 score 평균을 반올림한 만큼 파란 별 출력
          [
            ...Array(
              Math.round(
                reviews.reduce((acc, cur) => acc + cur.score, 0) /
                  reviews.length
              )
            ),
          ].map((_, i) => (
            <svg
              key={"full" + i}
              width={width ? width : "16"}
              height={width ? width : "16"}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7777 6.78426L12.0295 10.1448L13.1747 15.1687C13.205 15.2978 13.1978 15.4334 13.154 15.5582C13.1102 15.6831 13.0318 15.7916 12.9286 15.8701C12.8255 15.9486 12.7023 15.9936 12.5746 15.9994C12.4469 16.0051 12.3204 15.9714 12.2111 15.9024L7.9996 13.2092L3.78807 15.9016C3.6788 15.9706 3.55232 16.0043 3.42461 15.9986C3.2969 15.9928 3.17369 15.9478 3.07057 15.8693C2.96744 15.7908 2.88902 15.6823 2.84522 15.5574C2.80141 15.4326 2.79419 15.297 2.82447 15.1679L3.96971 10.144L0.221509 6.78346C0.125943 6.69623 0.0570432 6.58181 0.0233152 6.45433C-0.0104127 6.32685 -0.00749197 6.1919 0.0317169 6.06612C0.0709257 5.94035 0.144706 5.82927 0.243949 5.74659C0.343192 5.66391 0.463553 5.61326 0.590172 5.60088L5.50901 5.18482L7.40389 0.416108C7.4522 0.29308 7.53466 0.187798 7.64076 0.113688C7.74685 0.0395787 7.87178 0 7.9996 0C8.12743 0 8.25235 0.0395787 8.35845 0.113688C8.46455 0.187798 8.54701 0.29308 8.59531 0.416108L10.4902 5.18482L15.409 5.60088C15.5358 5.61311 15.6564 5.66372 15.7558 5.74645C15.8552 5.82918 15.9291 5.94039 15.9683 6.06633C16.0076 6.19226 16.0104 6.32739 15.9765 6.455C15.9426 6.5826 15.8735 6.69708 15.7777 6.78426Z"
                fill="#3592F0"
              />
            </svg>
          ))}
      {reviewLoading
        ? null
        : reviews.length === 0
        ? null
        : // 5에서 파란 별 개수 뺀 만큼 빈 별 출력
          [
            ...Array(
              5 -
                Math.round(
                  reviews.reduce((acc, cur) => acc + cur.score, 0) /
                    reviews.length
                )
            ),
          ].map((_, i) => (
            <svg
              key={"empry" + i}
              width={width ? width : "16"}
              height={width ? width : "16"}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7777 6.78426L12.0295 10.1448L13.1747 15.1687C13.205 15.2978 13.1978 15.4334 13.154 15.5582C13.1102 15.6831 13.0318 15.7916 12.9286 15.8701C12.8255 15.9486 12.7023 15.9936 12.5746 15.9994C12.4469 16.0051 12.3204 15.9714 12.2111 15.9024L7.9996 13.2092L3.78807 15.9016C3.6788 15.9706 3.55232 16.0043 3.42461 15.9986C3.2969 15.9928 3.17369 15.9478 3.07057 15.8693C2.96744 15.7908 2.88902 15.6823 2.84522 15.5574C2.80141 15.4326 2.79419 15.297 2.82447 15.1679L3.96971 10.144L0.221509 6.78346C0.125943 6.69623 0.0570432 6.58181 0.0233152 6.45433C-0.0104127 6.32685 -0.00749197 6.1919 0.0317169 6.06612C0.0709257 5.94035 0.144706 5.82927 0.243949 5.74659C0.343192 5.66391 0.463553 5.61326 0.590172 5.60088L5.50901 5.18482L7.40389 0.416108C7.4522 0.29308 7.53466 0.187798 7.64076 0.113688C7.74685 0.0395787 7.87178 0 7.9996 0C8.12743 0 8.25235 0.0395787 8.35845 0.113688C8.46455 0.187798 8.54701 0.29308 8.59531 0.416108L10.4902 5.18482L15.409 5.60088C15.5358 5.61311 15.6564 5.66372 15.7558 5.74645C15.8552 5.82918 15.9291 5.94039 15.9683 6.06633C16.0076 6.19226 16.0104 6.32739 15.9765 6.455C15.9426 6.5826 15.8735 6.69708 15.7777 6.78426Z"
                fill="#B9B9B9"
              />
            </svg>
          ))}

      <span>
        {
          // reviews가 비어있으면 (0) 출력, 아니면 reviews 개수 출력
          reviewLoading
            ? null
            : reviews.length === 0
            ? "(0)"
            : `(${reviews.length})`
        }
      </span>
    </Wrapper>
  );
}
