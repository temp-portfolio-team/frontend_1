import React, { useState, useEffect, useRef } from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import auth from '../../api/auth';
import { setImage } from '../../store/user';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const nameRef = useRef('');
  const [gender, setGender] = useState(user.gender);
  const addressRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef('');

  const handleGenderChange = e => setGender(e.target.id);

  const onProfileModify = () => {
    const userData = {
      id: user.id,
      address: addressRef.current.value,
      email: emailRef.current.value,
      gender: gender,
      imageUrl: '',
      name: nameRef.current.value,
      phone: phoneRef.current.value,
    };
    auth.modifyUser(userData).then(res => {
      dispatch(setImage(res.data.imageUrl));
      navigate('/');
    });
  };

  useEffect(() => {
    if (!user.profileSaveUser) {
      navigate('/');
      return;
    }
  }, []);

  return (
    <S.ProfilePage title="프로필 수정">
      <S.ProfileWrap>
        <S.UserForm>
          <S.ImageUpload>
            <S.UserImg />
            <S.ButtonWrap>
              <S.ImgButton name="기본이미지" />
              <S.ImgButton name="이미지 선택" />
            </S.ButtonWrap>
          </S.ImageUpload>
          <S.Div>
            <S.H3>닉네임</S.H3>
            <S.Name defaultValue={user.name || ''} ref={nameRef} />
          </S.Div>
          <S.Div>
            <S.H3>성별</S.H3>
            <S.RadioWrap>
              <S.Radio
                value="남"
                name="gender"
                id="male"
                checked={gender === 'male'}
                onChange={handleGenderChange}
              />
              <S.Label htmlFor="male">남</S.Label>
              <S.Radio
                value="여"
                name="gender"
                id="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
              />
              <S.Label htmlFor="female">여</S.Label>
            </S.RadioWrap>
          </S.Div>
          <S.Div>
            <S.H3>사는지역</S.H3>
            <S.Address defaultValue={user.address || ''} ref={addressRef} />
          </S.Div>
          <S.Div>
            <S.H3>이메일</S.H3>
            <S.Email defaultValue={user.email || ''} ref={emailRef} />
          </S.Div>
          <S.Div>
            <S.H3>핸드폰</S.H3>
            <S.Phone defaultValue={user.phone || ''} ref={phoneRef} />
          </S.Div>
          <S.DeleteButton name="회원탈퇴" color="red" />
        </S.UserForm>
        <S.ComplateButton name="프로필 수정" onClick={onProfileModify} />
      </S.ProfileWrap>
    </S.ProfilePage>
  );
};

export default ProfilePage;
