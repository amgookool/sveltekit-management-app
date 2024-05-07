
export namespace UserTypes {
    export interface AuthUser {
        username: string;
        avatar: string;
        id: string;
        userEmail: string;
        userRole: string;
        firstName: string;
        lastName: string;
        avatar: string;
        isLocked: boolean;
        isVerified: boolean;
        isDeleted: boolean;
        forcePasswordChange: boolean;
    }

    export interface Address {
        street: string;
        city: string;
        country: string;
    }

    export interface CartItem {
        productId: string;
        productName: string;
        quantity: number;
        variant?: string;
        discount: number;
    }

    export interface AuthorizedUser extends AuthUser {
        accessToken: string;
    }

    export interface AuthorizationResponse {
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        user: AuthUser;
    }

    export interface User extends AuthUser {
        permissions: string[];
        clientProfile?: {
            addresses?: Address[];
            orders?: string[];
            requests?: string[];
            wishlist?: string[];
            cart?: CartItem[]
        };
        staffProfile?: string;
    }
}