export interface MemberInfo {
  id: number;
  email: string;
  name: string;
  nickName: string;
  provider: string;
  profileImgUrl: string;
  roomCount: number;
  reviewCount: number;
  followingCount: number;
  followerCount: number;
}

export interface MemberInfoProps {
  isLoggedIn: boolean;
  memberInfo: MemberInfo | null;
  onLogin: () => void;
  onLogout: () => void;
}

export interface MemberProfileProps {
  profileImage: string;
  name: string;
  followers: number;
  following: number;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
  isOwnProfile?: boolean;
}

export interface MemberInfoState {
  nickname: string;
  provider: string;
  email: string;
  roomCount: number;
  reviewCount: number;
  isOwnProfile?: boolean;
  onNicknameChange?: (newNickname: string) => void;
  isLoading?: boolean;
}

export interface VisibilitySelectorProps {
  visibility: "public" | "private";
  onChange: (value: "public" | "private") => void;
}

export interface MemberSelectorProps {
  search: string;
  onSearchChange: (value: string) => void;
  filteredMembers: MemberInfo[];
  selectedMembers: MemberInfo[];
  toggleMember: (member: MemberInfo) => void;
  currentMemberId: number;
}

export interface FollowMember {
  id: number;
  name: string;
  nickName: string;
  profileImageUrl: string;
}

export interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "followers" | "following";
  followers: FollowMember[];
  following: FollowMember[];
  isLoading?: boolean;
}
