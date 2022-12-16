/**
 * taken verbatim from Next.js docs examples:
 * https://github.com/vercel/next.js/tree/canary/examples/active-class-name
 * "ReactRouter has a convenience property on the Link element to allow an author to set the active className on a link.
 * This example replicates that functionality using Next's own Link."
 */
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, useState, useEffect } from "react";

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName: string;
};

const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath, isReady } = useRouter();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${className} ${activeClassName}`.trim()
          : className;

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
